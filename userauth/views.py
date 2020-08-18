from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from .forms import SignUpForm
from .tokens import account_activation_token

from django.contrib.auth.views import LoginView as AuthLoginView, LogoutView, PasswordChangeView as AuthPasswordChangeView, PasswordResetView as AuthPasswordResetView, PasswordResetConfirmView as AuthPasswordResetConfirmView
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth import login
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode ,urlsafe_base64_decode
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from django.contrib.messages.views import SuccessMessageMixin

# Create your views here.
class LoginView(AuthLoginView):
  template_name = 'userauth/login.html'
  next = reverse_lazy('frontend:index')

class PasswordChangeView(SuccessMessageMixin, AuthPasswordChangeView):
  template_name = 'userauth/password_change.html' 
  success_url = '/'
  success_message = 'Password updated successfully.'

def signup(request):
  if request.method == 'POST':
    form = SignUpForm(request.POST)
    if form.is_valid():
      user = form.save(commit=False)
      user.is_active = False
      user.save()
      current_site = get_current_site(request)
      subject = 'Activate your TodoEPC Account.'
      message = render_to_string('userauth/account_activation_email.html',{
        'user': user,
        'protocol': request.scheme,
        'domain': request.get_host(),
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': account_activation_token.make_token(user),
      })
      user.email_user(subject, message)
      return redirect('userauth:account_activation_sent')

  else:
    form = SignUpForm()
    print(request.get_host())

  return render(request, 'userauth/signup.html', {'form': form})

def account_activate(request, uidb64, token):
  try:
    uid = force_text(urlsafe_base64_decode(uidb64))
    user = User.objects.get(pk=uid)
  except (TypeError, ValueError, OverflowError, User.DoesNotExist):
    user = None

  if user is not None and account_activation_token.check_token(user, token):
    user.is_active = True
    user.account.email_confirmed = True
    user.save()
    login(request, user)
    return redirect('frontend:index')
  else:
    return render(request, 'userauth/account_activation_invalid.html')

class PasswordResetView(AuthPasswordResetView):
  template_name = 'userauth/password_reset/password_reset.html'
  email_template_name = 'userauth/password_reset/password_reset_email.html'
  subject_template_name = 'userauth/password_reset/password_reset_subject.txt'
  success_url = reverse_lazy('userauth:password_reset_done')

class PasswordResetConfirmView(SuccessMessageMixin, AuthPasswordResetConfirmView):
  template_name = 'userauth/password_reset/password_reset_confirm.html'
  post_reset_login = True
  success_url = '/'
  success_message = 'Password updated successfully.'
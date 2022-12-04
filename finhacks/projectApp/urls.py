from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("quiz", views.quiz, name="quiz"),
    path("needs_and_wants", views.needs_and_wants, name="needs_and_wants"),
    path("slider", views.slider, name="slider"),
    path("wish_list", views.wish_list, name="wish_list"),
    path("expense_tracker", views.expense_tracker, name="expense_tracker"),
]

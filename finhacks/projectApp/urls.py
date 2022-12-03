from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("needs_and_wants", views.needs_and_wants, name="needs_and_wants"),
    path("slider", views.slider, name="slider"),
]

from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader


def index(request):
  template = loader.get_template('first.html')
  return HttpResponse(template.render())


def quiz(request):
  template = loader.get_template('quiz.html')
  return HttpResponse(template.render())
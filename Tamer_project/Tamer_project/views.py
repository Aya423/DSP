from django.urls import path 
from django.shortcuts import render 
from django.http import JsonResponse
import pandas as pd

from django.views.decorators.csrf import csrf_exempt
def home(request):

    

    return render(request , "../templates/home.html")

@csrf_exempt  
def load_signal(request):
    df = pd.read_csv(request.FILES["file"])  # time, value
    data = {
        "time": df["t"].tolist(),
        "signal": df["v3"].tolist()
    }
    return JsonResponse(data)
from django.shortcuts import render, redirect
from .forms import FileUploadForm

# Create your views here.
def upload_file(request):
    if request.method == "POST":
        form = FileUploadForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('success')
    else:
        form = FileUploadForm()

    return render(request, 'cv_upload/index.html', {'form': form})

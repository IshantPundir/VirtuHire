from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .serializers import UserSerializer

class SignUpView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HomeView(APIView):
    permission_classes = (IsAuthenticated, )
  
    def get(self, request):
        content = {'message': 'Welcome to the VirtuHire Authentification page!'}
        return Response(content)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        print("Got POST request for logout")
        try:
            print(request.data)
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
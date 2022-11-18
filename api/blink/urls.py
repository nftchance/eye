from rest_framework import routers

from .views import BlinkViewSet

router = routers.DefaultRouter()

router.register(r'blink', BlinkViewSet)

urlpatterns = router.urls
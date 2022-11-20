from rest_framework import routers

from .views import BlinkViewSet, EyeViewSet

router = routers.DefaultRouter()

router.register(r'eye', EyeViewSet)
router.register(r'blink', BlinkViewSet)

urlpatterns = router.urls
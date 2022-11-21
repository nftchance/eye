from rest_framework import routers

from django.contrib import admin
from django.urls import include, path

from blink.urls import router as blink_router

router = routers.DefaultRouter()
router.registry.extend(blink_router.registry)

urlpatterns = router.urls + [
    path("admin/", admin.site.urls),
]

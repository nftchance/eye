from rest_framework import routers

from django.contrib import admin
from django.urls import include, path

from blink.urls import router as blink_router

router = routers.DefaultRouter()
router.registry.extend(blink_router.registry)

urlpatterns = router.urls + [
    path("admin/", admin.site.urls),
    # These urls will not be included in the API due to non-conformity of standard
    path("account/", include("account.urls")),
]
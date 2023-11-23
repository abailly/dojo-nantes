#!/bin/bash
# Restart remote VM

[ -z "${GOOGLE_APPLICATION_CREDENTIALS}" ] && { echo "please set env variable GOOGLE_APPLICATION_CREDENTIALS"; exit 1; }

[ $# -eq 1 ] || { echo "requires an argument 'user@machine-name'"; exit 1 ; }

gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}

CONNECT_AS=$1
PROJECT=${PROJECT:-iog-hydra}


gcloud "--project=${PROJECT}" compute instances reset $@

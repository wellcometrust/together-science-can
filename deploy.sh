#!/bin/bash

set -o errexit
set -o nounset

aws s3 sync dist/ s3://togethersciencecan.org/ --region=eu-west-2 --delete --acl public-read

# as of September 2017, Cloudfront CLI isn't enabled by default
aws configure set preview.cloudfront true

aws cloudfront create-invalidation \
  --distribution-id "$AWS_CF_DISTRIBUTION_ID" \
  --paths /index.html

# the aws command doesn't exit properly so we force-exit if successful
# this tells CI we've successfully deployed
exit 0

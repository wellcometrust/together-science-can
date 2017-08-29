set -o errexit

aws s3 sync dist/ s3://togethersciencecan.org/ --region=eu-west-2 --delete --acl public-read --exclude ".DS_Store"
# the aws command doesn't exit properly so we force-exit if successful
# this tells CI we've successfully deployed
exit 0

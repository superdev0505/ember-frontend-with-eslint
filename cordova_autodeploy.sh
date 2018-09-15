#!/bin/bash
#
# Script to auto-deploy Cordova app
# Goal is to compile both iOS and Android apps and deploy to iTunes Connect / Google Play store respectively
# Unable to do on hosted CI as platforms not supported

########################################################################################
# Input settings
########################################################################################
# Build environment
ENV=production
# Where to deploy
DEPLOY_DIR=/Users/adam/tmp
WD=`pwd`
DEPLOY_BRANCH=master

# Make sure environment variables are loaded
source ~/.bashrc

########################################################################################
# Clone and setup Ember app
########################################################################################
# Clone the master branch
cd $DEPLOY_DIR
git clone -b $DEPLOY_BRANCH git@github.com:oslr/oslr-ui2.git
cd oslr-ui2
yarn install
# Install cordova platforms
ember cdv:platform add android
ember cdv:platform add ios

########################################################################################
# Versioning
#
# Major and minor version are stored in app.version file (e.g. 2.1)
# We add a further minor version which is based on date and time
########################################################################################
VERSION=`cat app.version`.`date '+%y%m%d%H%M'`
# Update version in config.xml
sed -i '' -e "s/0.0.12345/$VERSION/g" "ember-cordova/cordova/config.xml"

########################################################################################
# Android Deployment
#
# Dependencies - Building:
#   Install Java JDK 1.8
#   Install Android Studio command line tools
#   sudo chmod 755 /Applications/Android\ Studio.app/Contents/gradle/gradle-4.4/bin/gradle
# Dependencies - Uploading:
#   Create Google Play developer account and setup app
#   pip install google-api-python-client

########################################################################################
export SDKTOOLS=/Users/adam/Documents/Code/android-sdktools/bin
#export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_171.jdk/Contents/Home
export JAVA_HOME=`/usr/libexec/java_home -v 1.8` # Use java 8 for compatibility
export ANDROID_HOME=/Users/adam/Documents/Code/android-sdk-macosx
#export ANDROID_HOME=/Users/adam/Library/Android/sdk
#export ANDROID_SDK_ROOT=$ANDROID_HOME
# Make sure supported Android versions are installed
# Use API version 25 as per here:
#$SDKTOOLS/sdkmanager tools
#$SDKTOOLS/sdkmanager build-tools;25.0.0
#$SDKTOOLS/sdkmanager platforms;android-25

# Build the APK
ember cdv:build --platform android --environment $ENV --release -- --keystore=$SDKTOOLS/../oslr-key --storePassword=$ANDROID_SIGNING_KEY_PASSWORD --alias=oslr-key --password=$ANDROID_SIGNING_KEY_PASSWORD

# Sign it
#$ANDROID_HOME/build-tools/25.0.0/zipalign -f ember-cordova/cordova/platforms/android/build/outputs/apk/android-release-unsigned.apk ember-cordova/cordova/platforms/android/build/outputs/apk/android-release-unsigned-aligned.apk


$ANDROID_HOME/build-tools/25.0.0/apksigner sign -ks $SDKTOOLS/../oslr-key --ks-pass env:ANDROID_SIGNING_KEY_PASSWORD --out ember-cordova/cordova/platforms/android/build/outputs/apk/android-release.apk ember-cordova/cordova/platforms/android/build/outputs/apk/android-release-unsigned.apk


# Upload it
python google_play_api_upload.py com.embercordova.oslrUi2 ember-cordova/cordova/platforms/android/build/outputs/apk/android-release.apk


########################################################################################
# iOS Deployment
########################################################################################
ember cdv:build --platform ios --environment $ENV --release --codeSignIdentity="iPhone Distribution: Oslr Ltd (VC89R9N3EF)" --provisioningProfile="27f7d810-46eb-45fd-bb4f-20cc4071f6bc" --packageType="app-store" --developmentTeam="VC89R9N3EF"

# Push to iTunes Connect
/Applications/Xcode.app/Contents/Applications/Application\ Loader.app/Contents/Frameworks/ITunesSoftwareService.framework/Support/altool --upload-app -f "ember-cordova/cordova/platforms/ios/build/device/oslrUi2.ipa" -u $ITUNES_USERNAME -p $ITUNES_PASSWORD


########################################################################################
# Cleanup
########################################################################################
# Revert version in config.xml
sed -i '' -e "s/$VERSION/0.0.12345/g" "ember-cordova/cordova/config.xml"
cd $WD
#rm -rf $DEPLOY_DIR/oslr-ui2

# Doggo Snap

Doggo Snap is a mobile app for Android and iOS which can be used for classifying a dog's breed from an image. It provides you with information on the breed and let's you save the dogs you've photographed so that you can have a look at them later and see where you've met them on a map. It was created using [React Native](https://reactnative.dev/). No user data is saved on a server (except in logs), all saved dogs are persisted in an on-device SQLite database.

For classifying a dog's breed with computer vision, the app calls an API (see this [repo](https://github.com/Pascal-Bliem/doggo-snap-api)) which hosts a Deep Learning model, namely a slightly modified [MobileNetV2](https://arxiv.org/abs/1801.04381) convolutional neural network build with [PyTorch](https://pytorch.org/), converted to and run by [ONNX](https://onnx.ai/).

You can download it on the Google Play Store. It's not on the Apple App Store (becaus of their audacious fee for a developer account) but feel free to [contact me](http://www.pascal-bliem.com/#contact) if you want to have the iOS build.

Check out this [blog post](http://www.pascal-bliem.com/blog/the%20doggo%20snap%20mobile%20app) for a more detailed description on the app, [this one](http://www.pascal-bliem.com/blog/classifying%20dog%20breeds%20with%20deep%20learning) for a description of the machine learning model doing the image classification, and [this one](http://www.pascal-bliem.com/blog/transfer%20ml%20models%20easily%20with%20onnx) for how to convert the model to ONNX and e.g. transfer it from Python to JavaScript.

## A tour through the app

You start at the home screen from which you can take a picture to classify. You can also view your saved dogs in a list or on a map, and get information on all supported breeds:

<img src="https://pb-data-blogposts.s3.eu-central-1.amazonaws.com/doggo-snap/HomeScreen.jpg" style="width: 50%;" width="50%" alt="The Home Screen">

When your dog's been classified, you'll see the result plus some details (temperament, weight, hight, lifespan, region of origin) about the breed on the classification/details screen:

<img src="https://pb-data-blogposts.s3.eu-central-1.amazonaws.com/doggo-snap/ClassificationScreen.jpg" width="50%" style="width: 50%;" alt="The Classification Screen">

From there, you can decide to save the dog which leads you to the save screen, where you can give the dog a name and either automatically detect your device's location or manually pick it on a map:

<img src="https://pb-data-blogposts.s3.eu-central-1.amazonaws.com/doggo-snap/SaveScreen.jpg" style="width: 50%;" width="50%" alt="The Save Screen">

After saving the dog, you'll be navigated to your dog list screen where you can see all the dog's you've saved and tap them to see details about their breed and where you found them:

<img src="https://pb-data-blogposts.s3.eu-central-1.amazonaws.com/doggo-snap/DogListScreen.jpg" style="width: 50%;" width="50%" alt="The Dog List Screen">

You can also look up all the dog's you've saved on the map screen and check out where in your neighborhood you met them. Tapping on their markers will show you their detail screens:

<img src="https://pb-data-blogposts.s3.eu-central-1.amazonaws.com/doggo-snap/MapScreen.jpg" style="width: 50%;" width="50%" alt="The Map Screen">

If you haven't collected that many dogs yourself yet but still want to get information on all the supported breeds, you can check them out at the explore-all-breeds screen and tap each breed entry to get details on the breed:

<img src="https://pb-data-blogposts.s3.eu-central-1.amazonaws.com/doggo-snap/AllBreedsScreen.jpg" style="width: 50%;" width="50%" alt="The All-Breeds Screen">

Here's a rough overview of the app's functionality in a diagram:

![An overview of Doggo Snap's functionality](https://pb-data-blogposts.s3.eu-central-1.amazonaws.com/doggo-snap/diagramm.png)

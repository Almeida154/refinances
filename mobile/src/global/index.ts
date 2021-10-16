import { colors } from '../styles';

export default {
  IMAGE_CROP_PICKER_OPTIONS: {
    width: 400,
    height: 400,
    cropping: true,
    includeBase64: true,
    freeStyleCropEnabled: true,
    cropperCircleOverlay: true,
    disableCropperColorSetters: true,
    useFrontCamera: true,
    showCropGuidelines: true,
    showCropFrame: true,
    hideBottomControls: true,
    enableRotationGesture: true,
    compressImageQuality: 0.8,
    mediaType: 'photo',
    cropperActiveWidgetColor: colors.redCrayola,
    cropperStatusBarColor: colors.redCrayola,
    cropperToolbarColor: colors.redCrayola,
    cropperToolbarWidgetColor: colors.redCrayola,
    cropperToolbarTitle: 'Sua foto de perfil',
  },
};

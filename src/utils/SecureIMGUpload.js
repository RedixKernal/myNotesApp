import * as ImagePicker from 'expo-image-picker';
export const SecureIMGUpload = async (data) => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: data?.allowsEditing,
      aspect: data?.aspect,
    });

    try {
      if (!pickerResult.canceled) {
        await uploadImageAsync(pickerResult.assets[0].uri, pickerResult.assets[0], data?.endPoint);
      }
    } catch (e) {
      console.log(e);
    } 
  };




  async function uploadImageAsync(uri, imgDetails, endPoint) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
      
        let reader = new FileReader();
        reader.readAsDataURL(xhr.response);
        reader.onload = function () {
          const postListRef = ref(db, `/users/${userData.userName}/${endPoint}`);
          const newPostRef = push(postListRef);
          set(newPostRef, {
            img:reader.result,
            data:imgDetails,
          }).then((data) => {
              console.log(data)
          }).catch((er) => {
              console.log(er)
          })
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };

      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    blob.close();
  }
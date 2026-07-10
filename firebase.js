// Firebase 配置

const firebaseConfig = {
  apiKey: "AIzaSyCsIWG5J9J3_LcPKdKKJav7guSBJqqAqbk",
  authDomain: "heart-touch-c3f1e.firebaseapp.com",
  projectId: "heart-touch-c3f1e",
  storageBucket: "heart-touch-c3f1e.firebasestorage.app",
  messagingSenderId: "668837860072",
  appId: "1:668837860072:web:b9b11205e8f04d39dbef5d",
  measurementId: "G-HERWCV2YHJ"
};


// 初始化 Firebase

firebase.initializeApp(firebaseConfig);


// 连接实时数据库

const database = firebase.database();
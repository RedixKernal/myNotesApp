import { StyleSheet } from 'react-native';
const Styles = StyleSheet.create({
   dashboardMainContainer:{
    width:'100%',
    height:'100%',
    backgroundColor:'#fff',
    fontFamily:'Poppins',
  },
  headerView:{
    marginTop:5,
    width:'100%',
    height:60,
    position:'relative',
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
},
main: {
  width: "100%",
  height: "100%",
  alignItems: 'center',
  // justifyContent: 'center',
  backgroundColor: '#fff',
  display: 'flex',
  marginVertical:50
},
profileImageStyles:{
  margin:10
},
welcomeText:{
  fontWeight:'bold',
  fontSize:'18px',
  // borderWidth:1,
  width:'100%',
  padding:20
},
intro:{
  fontWeight:'bold',
  fontSize:20,
},
welBack:{
  fontWeight:'normal',
  fontSize:20,
  color: '#9095A1FF'
},
formContainer:{
  width:'100%',
  height:'100%',
  padding:10,
  // display:'flex',
  // alignItems:'center',
  justifyContent:'space-between',
  // borderWidth:1,
},
formFieldContainer:{
  width:'100%',
  // height:50,
  paddingHorizontal:2,
  // borderWidth:1,
  backgroundColor: '#fff',
  borderRadius: 6,
  padding:2,
  marginVertical:10,
},
formFieldLabel:{
  width:'100%',
  // borderWidth:1,
  display:"flex",
  borderRadius: 6,
  padding:6,
  paddingHorizontal:10,
},
formFieldInput:{
  width:'100%',
  borderWidth:1,
  borderColor:'#bebebe',
  display:"flex",
  alignItems:'center',
  flexDirection:"row",
  borderRadius: 6,
  paddingHorizontal:6,
},
formFieldLabelText:{
  fontWeight:'bold',
  fontSize:16,
},
inputField:{
  // borderWidth:1,
  width:'80%',
  // backgroundColor:"#dedede",
  fontWeight:'bold',
  fontSize:16,
  padding:8,
  borderRadius: 6,
},
forgotContainer:{
  width:"100%",
},
forgotText:{
  margin:10,
  color:'#1E64DDFF',
  fontSize:18,
  textAlign:'right'
},
signinButtonContainer:{
  width:'100%',
  display:'flex',
  // borderWidth:1,
  borderRadius:6,
  height:40,
  justifyContent:'center',
  backgroundColor:'#1E64DDFF',
  marginVertical:20,
},
signinButton:{
  width:'100%',
  display:'flex',
  // borderWidth:1,
  // borderRadius:6,
  // height:40,
  flexDirection:'row',
  justifyContent:'center'
},
signinButtonText:{
  textAlign:"center",
  fontSize:16,
  fontWeight:'bold',
  color:'#ffffff'
},
orText:{
  color:'#000',
  fontSize:18,
  textAlign:'center',
  fontWeight:'bold',
},
buttonContainer:{
  width:'100%',
  padding:10
},
signupButton:{
  width:'100%',
  display:'flex',
  flexDirection:'row',
  justifyContent:'center',
},
signupButtonFirstText:{
  fontSize:16,
  color: '#9095A1FF',
  marginHorizontal:2
},
signupButtonsignupText:{
  fontSize:16,
  color: '#1E64DDFF',
  marginHorizontal:2
},
helperText:{
  fontSize: 14,
  color: "#DB4437FF",
  paddingHorizontal: 10,
  width: "90%",
}
});
export default Styles;


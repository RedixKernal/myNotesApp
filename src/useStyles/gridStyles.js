import { StyleSheet } from 'react-native';
const GridStyles = StyleSheet.create({
  gridContainer:{
    alignItems:'center',
    flexDirection:'row',
    flexWrap:'wrap',
    paddingLeft:5,
    paddingRight:5,
},
cardContainer:{
    width:'47%',
    height:220,
    backgroundColor:'#fff',
    borderRadius:4,
    margin:5,
    overflow:'hidden',
    shadowColor: '#000',
    elevation: 2,
},
title:{
    padding:6,
    paddingLeft:8,
    fontSize: 14,
    textAlign: 'left',
    fontWeight:'bold',
    fontFamily:'Poppins',
    backgroundColor:'#f3f4f6ff'
},
noteData:{
    padding:10,
    color: '#444444',
    fontSize: 13,
    textAlign: 'justify',
    lineHeight:20,
    marginTop:4,
    marginBottom:10,
    fontWeight:'200',
    fontFamily:'Poppins',
    height:135,
    overflow:'hidden',
},
TouchableButton:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
},
viewStyles:{
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:40,
    paddingRight:40,
    color: '#444444',
    fontSize: 14,
    textAlign: 'center',
    textAlign: 'left',
    fontWeight:'bold',
    fontFamily:'Poppins',
    backgroundColor:'#314ddbff',
    color:'#fff',
    borderRadius:4,
    
}
});
export default GridStyles;
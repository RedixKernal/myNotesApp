import { StyleSheet } from 'react-native';
const Styles = StyleSheet.create({
  dashboardMainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    fontFamily: 'Poppins',
  },
  headerView: {
    marginTop: 5,
    width: '100%',
    height: 60,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  gridContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 5,
    paddingRight: 5,
  },
});
export default Styles;

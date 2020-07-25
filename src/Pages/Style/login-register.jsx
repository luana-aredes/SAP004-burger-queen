import { StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
  burguerImg: {
    width: '70%',
    marginTop: '80px',
  },
  fieldset: {
    border: 'none',
  },
  form: {
    textAlign: "center",
  },
  formContainer: {
    margin: '15% 5% 15% 0%',
    width: '75%'
  },
  grayFont: {
    color: '#E5E5E5',
  },
  logoImg: {
    width: '60%',
    marginTop: '3%',
    marginLeft: '3%',
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '768px',
    maxHeight: '650px',
    backgroundColor: '#8E3712',
  },
  registerText: {
    textAlign: 'center',
    fontSize: '20px',
    color: '#E5E5E5',
  },
  registerLink: {
    marginLeft: '7px',
    fontWeight: 'bold',
    color: '#C3846D'
  },
  select: {
    width: '100%',
    color: 'lightgray',
    border: '2px solid #E5B163',
    boxSizing: 'border-box',
    borderRadius: '10px',
    padding: '2%',
    fontSize: '1rem',
    backgroundColor: ' #4543B5;',
    margin: '15px auto',
  },
  alertError: {
    color: '#FF0000',
    border: '2px solid #FF0000',
    borderRadius: '5px',
    backgroundColor: '#FFFFCC',
    padding: '5px',
    marginBottom: '5px'
  }
})

export default styles;
import { StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
  fieldset: {
    border: 'none',
  },
  form: {
    textAlign: "center",
  },
  formContainer: {
    margin: '25% 5%',
    maxWidth: '900px',
    '@media (max-width: 481px)': {
      marginTop: '5%'
    }
  },
  grayFont: {
    color: '#E5E5E5',
  },
  pageContainer: {
    height: window.innerHeight,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#8E3712',
    '@media (max-width: 481px)': {
      flexDirection: 'column',
      justifyContent: 'space-between',
    }
  },
  registerText: {
    textAlign: 'center',
    fontSize: '20px',
    color: '#E5E5E5',
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
    marginBottom: '5px',
    textAlign: 'center'
  }
})

export default styles;
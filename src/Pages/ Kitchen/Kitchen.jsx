import React, { useState } from 'react';
import { db } from '../../config/firebase';
import Card from '../../Components/OrderCard/Card';
import Header from '../../Components/Header/Header';

{/* import request from './mock';*/ }

const Kitchen = () => {

  const [user, setUser] = useState(null)
  const [request, setRequest] = useState([])

  React.useEffect(() => {
    const request = async () => {
      try {
        const data = await db.collection('requests').get()
        const arrayData = data.docs.map(doc => (doc.data()))
        setRequest(arrayData)
      } catch (error) {
        console.log(error)
      }
    }
    request()
  }, [request])


  return (
    <main>
      <>
        <Header place={'kitchen'} />
      </>
      <div>Pedidos Pendentes</div>
      <section>
        {
          <Card
            request={request}
            name={"Pedido Pronto"}
          />
        }
      </section>
    </main >
  )
}

export default Kitchen


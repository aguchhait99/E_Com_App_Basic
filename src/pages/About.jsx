import React from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../context/Auth'

const About = () => {
    const [auth, setAuth] = useAuth()
  return (
    <>
      <Layout>
      <pre>{JSON.stringify(auth,null ,4)}</pre>
      </Layout>
    </>
  )
}

export default About

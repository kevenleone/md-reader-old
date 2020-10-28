import React from 'react'
import axios from 'axios'
import ReactMarkdown from '../components/Markdown/Reader'

const Index = ({markdown}) => {
  return (
     <ReactMarkdown>
      {markdown}
     </ReactMarkdown>
  )
}

Index.getInitialProps = async () => {
  const {data} = await axios.get('https://raw.githubusercontent.com/liferay/liferay-frontend-guidelines/master/dxp/how_to_minimize_bleeding_themes.md');

  return {
    markdown: data
  }
}

export default Index;

import React, { useState, useEffect } from 'react'
import {copy, linkIcon, loader, tick} from '../assets'
import {useLaxyGetSummaryQuery} from '../services/article'
const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  })
  const [allArticles, setAllArticles] = useState([])
  const [copied, setCopied] = useState('')

  //RTK lazy query
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery()
  
  //Load data from localStorage on mount
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  }, [])
  
  const handleSubmit = async (e) => {
    //Prevent default form submit behavior and clear the input field after submission 
    e.preventDefault()

    const existingArticle = allArticles.find
      ((item) => item.url === article.url)
    if (existingArticle) return setArticle(existingArticle)
    
    const { data } = await getSummary({ articleUrl: article.url })
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary }
      const updateAllArticles = [newArticle, ...allArticles]

      //update state and local storage
      setArticle(newArticle)
      setAllArticles(updateAllArticles)
      localStorage.setItem('articles', JSON.stringify(updateAllArticles))
    }
  }
  return (
    <section className='mt-16 w-full max-w-xl'>
      {/* Search */}
      <div className='flex flex-col w-full gap-2'>
        <form className='relative flex justify-center items-center'
          onSubmit={handleSubmit }
        >
          <img
            src={linkIcon}
            alt='link-icon'
            className='absolute left-0 my-2 ml-3 w-5' />
          
          <input
            type='url'
            placeholder='Paste the article link'
           // value={value}
            onChange={() => ({})}
            //onKeyDown={ }
            required
            className='url_input peer' />
          <button 
            type='submit'
            className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>
            <p>↵</p>n
            </button>
        </form>
      </div>
    </section>
  )
}

export default Demo

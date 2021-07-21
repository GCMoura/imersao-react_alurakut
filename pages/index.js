import React, { useEffect, useState } from 'react'
import MainGrid from '../src/components/MainGrid/index'
import Box from '../src/components/Box/index'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { Picsum } from 'picsum-photos'

import ProfileSidebar from '../src/hooks/ProfileSideBar'
import ProfileRelationsBox from '../src/hooks/ProfileRelationsBox'

export default function Home() {
  const githubUser = 'GCMoura'

  const [communities, setCommunities] = useState([])
  const [feed, setFeed] = useState([])
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])

  useEffect(() => {
    try {
      fetch('https://api.github.com/users/GCMoura/followers')
        .then((serverResponse) => {
          return serverResponse.json()
        })
        .then((response) => {
          setFollowers(response)
        })
    } catch (error) {
      console.error(error)
    }

    try {
      fetch('https://api.github.com/users/GCMoura/following')
        .then((serverResponse) => {
          return serverResponse.json()
        })
        .then((response) => {
          setFollowing(response)
        })
    } catch (error) {
      console.error(error)
    }

    try {
      fetch('https://graphql.datocms.com/', {
        method: 'POST',
        //dados do DatoCMS
        headers: {
          'Authorization': '229af60a8bd95fe2fc75f760873d48',
          'Content-Type': 'application/json',
          'Accept': 'application/json'          
        },
        body: JSON.stringify({ "query": `
        {
          allCommunities {
            id
            title
            imageurl
            _firstPublishedAt
          }
        
          _allCommunitiesMeta {
            count
          }
        }
        ` })
      })
        .then((serverResponse) => serverResponse.json())
        .then((response) => {
          const serverCommunities = response.data.allCommunities
          console.log(serverCommunities)

          setCommunities(serverCommunities)
        })
    } catch (error) {
      console.error(error) 
    }

  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const imagePicsum = Picsum.url()
    
    const community = {
      title: formData.get('title'),
      imageurl: imagePicsum
    }
    
    try {
      fetch('/api/communities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(community)
      })
        .then(async (response) => {
          const data = await response.json()

          const community = data.recordCreated
          setCommunities([...communities, community])
        })
    } catch (error) {
      console.log(error)
    }

  }

  function handleFeedSubmit(event){
    event.preventDefault()
    const formData = new FormData(event.target)

    const currentFeed = {
      id: new Date().toISOString(),
      date: new Date().toLocaleDateString('pt-BR'),
      feed: formData.get('feed')
    }

    setFeed([...feed, currentFeed])
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={ githubUser }/>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box >
            <h1 className="title">
              Bem vindo(a) {githubUser}
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={handleSubmit} >
              <div>
                <input  
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>

          <Box>
            <form onSubmit={handleFeedSubmit}>
              <div>
                <input 
                  placeholder="O que está pensando?"
                  name="feed"
                  aria-label="O que está pensando?"
                  type="text"
                />
              </div>

              <button>
                  Postar
              </button>
            </form>
          </Box>

          <Box>
            <h2 className="subTitle">Feed</h2>

            <ul style={{ listStyleType: "none" }}>
              { feed.map((item) => {
                return(
                  <li key={item.id}>
                    <h6>{ item.date }</h6>
                    <p>{ item.feed }</p>
                    <hr />
                  </li>
                  )
              }) }
            </ul>
          

          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper >
            <h2 className="smallTitle" >
              Comunidades ({ communities.length })
            </h2>
            
            <ul>
              { communities.map((community, index) => {
                if(index < 6){
                  return (
                    <li key={ community.id }>
                      <a href={`/communities/${community.id}`}  >
                        <img src={community.imageurl}/>
                        <span> { community.title } </span>
                      </a>
                    </li>
                  )
                }
              }) }

            </ul>
          </ProfileRelationsBoxWrapper>

          < ProfileRelationsBox
            title="Seguidores" 
            items={followers}
          />  

          < ProfileRelationsBox
            title="Seguindo" 
            items={following}
          />         
        
        </div>
      </MainGrid>
    </>
  )
}

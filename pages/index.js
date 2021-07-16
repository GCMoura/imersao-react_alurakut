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

  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const imagePicsum = Picsum.url()

    const community = {
      id: new Date().toISOString(),
      title: formData.get('title'),
      image: imagePicsum
    }
    
    setCommunities([...communities, community])
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
              Bem vindo(a)
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
                      <a href={`/user/${community.title}`}  >
                        <img src={community.image}/>
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

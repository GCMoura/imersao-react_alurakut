import React, { useEffect, useState } from 'react'
import MainGrid from '../src/components/MainGrid/index'
import Box from '../src/components/Box/index'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

import { wiki } from 'wikipedia'

function ProfileSidebar({ githubUser }){
  return (
    <Box as="aside">
      <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }}/>
      <hr />
      <p>
        <a className='boxLink' href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>     
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault /> 
    </Box>
  )
}

export default function Home() {
  const githubUser = 'GCMoura'

  const favoritePeople = [ 
    'peas', 
    'juunegreiros', 
    'rafaballerini', 
    'marcobrunodev',
    'felipefialho',
    'omariosouto',
    'gcmoura'
  ]

  useEffect(() => {
    async () => {
      const page = await wiki.page('Batman')
      console.log(page)
    }
  }, [])

  const [communities, setCommunities] = useState([])

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)

    const community = {
      id: new Date().toISOString(),
      title: formData.get('title'),
      image: formData.get('image')
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
              <div>
                <input  
                    placeholder="Coloque uma URL para usarmos de capa" 
                    name="image"
                    aria-label="Coloque uma URL para usarmos de capa"
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
              { communities.map((community) => {
                return (
                  <li key={ community.id }>
                    <a href={`/user/${community.title}`}  >
                      <img src={community.image}/>
                      <span> { community.title } </span>
                    </a>
                  </li>
                )
              }) }

            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper >
            <h2 className="smallTitle" >
              Pessoas da comunidade ({ favoritePeople.length })
            </h2>

            <ul>
              { favoritePeople.map((person, index) => {
                if(index < 6){
                  return (
                    <li key={ person }>
                      <a href={`/user/${person}`}  >
                        <img src={`https://github.com/${person}.png`}/>
                        <span> { person } </span>
                      </a>
                    </li>
                  )
                }
              }) }

            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}

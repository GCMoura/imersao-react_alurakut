import { ProfileRelationsBoxWrapper } from "../components/ProfileRelations"

export default function ProfileRelationsBox({ title, items }){
  return (
    <ProfileRelationsBoxWrapper >
      <h2 className="smallTitle" >
        { title } ({ items.length })
      </h2>

      <ul>
        { items.map((item, index) => {
          if(index < 6){
            return (
              <li key={ item.id }>
                <a href={`https://github.com/${ item.login }`}  >
                  <img src={`${item.avatar_url }`}/>
                  <span> { item.login } </span>
                </a>
              </li>
            )
          }
        }) }
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}
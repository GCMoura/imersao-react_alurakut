import { SiteClient } from 'datocms-client'

export default async function recieveRequest(request, response) {
  if(request.method === 'POST'){
    const client = new SiteClient('d900a0e4b5c48c556166e07ce1c31d')
  
    const recordCreated = await client.items.create({
      itemType: '975665',
      //pode colocar fora para validar os dados
      ...request.body
    })
  
    response.json({
      recordCreated: recordCreated
    })

  }

}
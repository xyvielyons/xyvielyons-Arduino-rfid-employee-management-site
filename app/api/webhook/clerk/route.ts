import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent, clerkClient } from '@clerk/nextjs/server'
// import { CreateUser, deleteUser, updateUser } from '@/lib/actions/user.action'
import { NextResponse } from 'next/server'
import axios from 'axios'
export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const {id} = evt.data
  const eventType = evt.type
  
  if(eventType === "user.created"){
    const {id,email_addresses,username} = evt.data
    console.log(evt.data)
    const organization = {
      clerkId:id,
      email:email_addresses[0].email_address,
      username:username!,
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          // Add any other required headers here
          Authorization: 'Bearer your-token', // Example for authentication
        },
      };

      const serverUrl = process.env.EXPRESS_SERVER_URI;
      const resp = await axios.post(`${serverUrl}/api/arduino/organization/createorganization`,organization,config)
    

      const databaseId = resp.data.data._id;
      console.log(databaseId);
      if(databaseId){
        await clerkClient.users.updateUserMetadata(id,{
          publicMetadata:{
              organizationId:databaseId
          }
        })
      

      }
            
          return NextResponse.json({message:'OK',user:resp})

    } catch (error) {
      console.log(error);
    }

  }

  if(eventType === 'user.updated'){
    const {id,email_addresses,username,public_metadata} = evt.data
    console.log(evt.data)
    const organization = {
      id:public_metadata.organizationId,
      username:username!,
    }
    try {
      const serverUrl = process.env.EXPRESS_SERVER_URI;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          // Add any other required headers here
          Authorization: 'Bearer your-token', // Example for authentication
        },
    };
    const resp = await axios.post(`${serverUrl}/api/arduino/organization/updateorganization`,organization,config)
    return NextResponse.json({message:'OK',user:resp})
    } catch (error) {
      console.log(error)
    }

    

   
  }
  if(eventType === 'user.deleted'){
    console.log(evt.data)
    const {id} = evt.data;
    const deletedOrganizationId = {
      id
    }
    try {
      const serverUrl = process.env.EXPRESS_SERVER_URI;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          // Add any other required headers here
          Authorization: 'Bearer your-token', // Example for authentication
        },
    };
    const resp = await axios.post(`${serverUrl}/api/arduino/organization/deleteorganization`,deletedOrganizationId,config)
    return NextResponse.json({message:'OK',user:resp})
    } catch (error) {
      console.log(error)
    }

    

   
  }

  
  return new Response('', { status: 200 })
}
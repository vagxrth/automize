import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

// Add this export to configure the route
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { id, email_addresses, first_name, image_url } = body?.data || {}

        if (!id || !email_addresses || email_addresses.length === 0) {
            return new NextResponse('Required parameter not provided', { status: 400 })
        }

        const email = email_addresses[0]?.email_address

        await db.user.upsert({
            where: { clerkId: id },
            update: {
                email,
                name: first_name,
                profileImage: image_url,
            },
            create: {
                clerkId: id,
                email,
                name: first_name || '',
                profileImage: image_url || '',
            },
        })
        return new NextResponse('User updated in database successfully', {
            status: 200,
        })
    } catch (error) {
        console.error('Error updating database:', error)
        return new NextResponse('Error updating user in database', { status: 500 })
    }
}
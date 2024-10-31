"use client"

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { EditUserProfileSchema } from '@/lib/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

type Props = {
    user: any
    onUpdate?: any
}

const ProfileForm = ({ user, onUpdate }: Props) => {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof EditUserProfileSchema>>({
        mode: 'onChange',
        resolver: zodResolver(EditUserProfileSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
        },
    })

    const handleSubmit = async (
        values: z.infer<typeof EditUserProfileSchema>
      ) => {
        setLoading(true)
        await onUpdate(values.name)
        setLoading(false)
      }

      useEffect(() => {
        form.reset({ name: user.name, email: user.email })
      }, [user])

    return (
        <Form {...form}>
            <form className='flex flex-col gap-6' onSubmit={form.handleSubmit(handleSubmit)}></form>
            <FormField
                disabled={loading}
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-lg">User full name</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder="Name"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-lg">Email</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                disabled={true}
                                placeholder="Email"
                                type="email"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit" className="self-start hover:bg-[#2e2e2e] hover:text-white ">
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving
                    </>
                ) : (
                    'Save User Settings'
                )}
            </Button>
        </Form>
    )
}

export default ProfileForm
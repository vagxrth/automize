'use client'
import React, { useEffect, useRef, useState } from 'react'
import * as LR from '@uploadcare/blocks'
import { useRouter } from 'next/navigation'
import dynamic from "next/dynamic";
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lr-config': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'ctx-name': string;
        pubkey: string;
      };
      'lr-upload-ctx-provider': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'ctx-name': string;
      };
    }
  }
}

type Props = {
  onUpload: (e: string) => any
}

LR.registerBlocks(LR)

const UploadCare = ({ onUpload }: Props) => {
  const router = useRouter()
  const ctxProviderRef = useRef<
    typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider
  >(null)

  useEffect(() => {
    const handleUpload = async (e: any) => {
      const file = await onUpload(e.detail.cdnUrl)
      if (file) {
        router.refresh()
      }
    }
    if (ctxProviderRef.current) {
      ctxProviderRef.current.addEventListener('file-upload-success', handleUpload)
    }
  }, [onUpload, router])

  return (
    <div>
      <lr-config
        ctx-name="my-uploader"
        pubkey="03fb90abbbabfc5db66c"
      />

<FileUploaderRegular pubkey="03fb90abbbabfc5db66c" />

      <lr-upload-ctx-provider
        ctx-name="my-uploader"
        ref={ctxProviderRef}
      />
    </div>
  )
}

export default dynamic (() => Promise.resolve(UploadCare), {ssr: false})
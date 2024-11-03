'use client'
import WorkflowForm from '@/components/forms/WorkflowForm'
import CustomModal from '@/components/global/CustomModel'
import { Button } from '@/components/ui/button'
import { useBilling } from '@/providers/BillingProvider'
import { useModal } from '@/providers/ModalProvider'
import { Plus } from 'lucide-react'
import React from 'react'

type Props = {}

const WorkflowButton = (props: Props) => {
    const { setOpen, setClose } = useModal();
    const { credits } = useBilling()

    const handleClick = () => {
        setOpen(
          <CustomModal
            title="Create a Workflow Automation"
            subheading="Workflows are a powerfull that help you automate tasks."
          >
            <WorkflowForm />
          </CustomModal>
        )
      }

  return (
    <Button
      size={'icon'}
      {...(credits !== '0'
        ? {
            onClick: handleClick,
          }
        : {
            disabled: true,
          })}
    >
      <Plus />
    </Button>
  )
}

export default WorkflowButton
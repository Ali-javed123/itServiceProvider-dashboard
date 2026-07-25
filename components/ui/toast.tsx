// lib/toast.ts
import { toast } from 'sonner'
import { 
  CheckCircle, 
  XCircle, 
  Info, 
  AlertTriangle,
  Loader2 
} from 'lucide-react'

// ✅ Success Toast
export const showSuccess = (message: string, description?: string) => {
  toast.success(message, {
    description: description,
    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    className: 'toast-success',
    duration: 4000,
  })
}

// ✅ Error Toast
export const showError = (message: string, description?: string) => {
  toast.error(message, {
    description: description,
    icon: <XCircle className="h-5 w-5 text-red-500" />,
    className: 'toast-error',
    duration: 5000,
  })
}

// ✅ Info Toast
export const showInfo = (message: string, description?: string) => {
  toast.info(message, {
    description: description,
    icon: <Info className="h-5 w-5 text-blue-500" />,
    className: 'toast-info',
    duration: 3000,
  })
}

// ✅ Warning Toast
export const showWarning = (message: string, description?: string) => {
  toast.warning(message, {
    description: description,
    icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    className: 'toast-warning',
    duration: 4000,
  })
}

// ✅ Loading Toast
export const showLoading = (message: string) => {
  return toast.loading(message, {
    icon: <Loader2 className="h-5 w-5 animate-spin" />,
    className: 'toast-loading',
  })
}

// ✅ Dismiss Toast
export const dismissToast = (toastId: string | number) => {
  toast.dismiss(toastId)
}
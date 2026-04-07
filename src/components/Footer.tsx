interface FooterProps {
  companyName?: string
  email?: string
  phone?: string
}

export default function Footer({ 
  companyName = "Your Business",
  email = "contact@yourbusiness.com",
  phone = "+48 123 456 789"
}: FooterProps) {
  return (
    <footer className="py-8 px-8 bg-gray-900 text-white text-center">
      <div className="max-w-4xl mx-auto">
        <p className="text-lg font-semibold mb-2">{companyName}</p>
        <p className="text-gray-400 text-sm">
          {email} • {phone}
        </p>
        <p className="text-gray-500 text-xs mt-4">
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
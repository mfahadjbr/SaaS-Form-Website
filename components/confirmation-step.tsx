export function ConfirmationStep({ data }: StepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Please confirm your information:</h3>
      <div>
        <h4 className="font-medium">Personal Information:</h4>
        <p>Name: {data.firstName} {data.lastName}</p>
        <p>Email: {data.email}</p>
      </div>
      <div>
        <h4 className="font-medium">Company Information:</h4>
        <p>Company: {data.companyName}</p>
        <p>Industry: {data.industry}</p>
        <p>Employees: {data.employeeCount}</p>
      </div>
      <div>
        <h4 className="font-medium">Selected Plan:</h4>
        <p>{data.plan}</p>
      </div>
    </div>
  )
}

ConfirmationStep.handleSubmit = () => {}


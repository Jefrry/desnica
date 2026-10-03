interface DeploymentContent<T> {
  previewMode: boolean
  production: T
  preview: T
}

export function selectDeploymentContent<T>({
  previewMode,
  production,
  preview,
}: DeploymentContent<T>) {
  return previewMode ? preview : production
}

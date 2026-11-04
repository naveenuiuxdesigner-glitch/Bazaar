import { EmptyState } from '../components/ui/States'
import { Button } from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="container-page">
      <EmptyState title="This page doesn’t exist" body="The link may be broken or the page may have moved.">
        <Button to="/">Go to home</Button>
        <Button to="/categories" variant="secondary">Browse categories</Button>
      </EmptyState>
    </div>
  )
}

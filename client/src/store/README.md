# Store Architecture

This directory contains the application's data layer organized by domain with clear separation of concerns.

## Structure

```
store/
├── {domain}/
│   ├── service/           # API layer - handles HTTP requests
│   │   ├── {domain}.service.ts
│   │   ├── {domain}.resources.ts
│   │   ├── dto/
│   │   └── index.ts
│   ├── view/             # Controller layer - uses service and forwards data
│   │   ├── {domain}.view.ts
│   │   └── index.ts
│   └── index.ts          # Domain exports
└── index.ts              # Store exports
```

## Layers

### Service Layer (`/service/`)

**Purpose**: Handles all API communication and data fetching.

**Responsibilities**:
- HTTP requests to backend APIs
- Request/response transformation
- Error handling
- API endpoint management

**Example**:
```typescript
// category.service.ts
class CategoriesService {
  async getCategories(): Promise<CategoryBackendDto[]> {
    const response = await api.get<CategoryBackendDto[]>(RESOURCES.LIST);
    return response.data; // Raw backend data with string values
  }
}
```

### View Layer (`/view/`) - Controller Pattern

**Purpose**: Acts as a controller that uses the service layer and forwards data to React components.

**Responsibilities**:
- Forwarding service calls to components
- Data transformation and aggregation
- Business logic for display
- Acting as intermediary between service and UI

**Example**:
```typescript
// category.view.ts
export class CategoryView {
  // Transform backend data to frontend format
  private static transformCategory(backendCategory: CategoryBackendDto): Category {
    return {
      ...backendCategory,
      value: parseFloat(backendCategory.value) || 0, // Convert string to number
    };
  }

  // Forward service calls with transformation
  static async getCategories(): Promise<Category[]> {
    const backendCategories = await categoriesService.getCategories();
    return this.transformCategories(backendCategories);
  }
  
  // Add aggregation
  static async getCategorySummary(): Promise<CategorySummary> {
    const categories = await this.getCategories();
    return this.calculateSummary(categories);
  }
}
```

## Data Transformation

The view layer automatically transforms backend data to frontend-compatible formats:

### Value Field Transformation

- **Backend**: Sends `value` as `string`
- **Frontend**: Receives `value` as `number`
- **Transformation**: `parseFloat(backendValue) || 0`

### DTOs Structure

```typescript
// Backend DTO (from API)
interface CategoryBackendDto {
  value: string; // Backend sends as string
}

// Frontend DTO (for UI)
interface Category {
  value: number; // Transformed to number
}
```

## Usage

### In Hooks

```typescript
import { CategoryView } from '@/store';

export function useCategorySummary() {
  const { data: summary } = useQuery({
    queryKey: ['categories', 'summary'],
    queryFn: CategoryView.getCategorySummary, // Uses controller with transformation
  });
  
  return { summary }; // Gets transformed data with number values
}
```

### In Components

```typescript
import { useCategorySummary } from '@/hooks';

export function Categories() {
  const { summary } = useCategorySummary();
  
  if (!summary) return <div>Loading...</div>;
  
  return (
    <div>
      <p>Total: ${summary.grandTotal.toFixed(2)}</p> {/* Works with numbers */}
    </div>
  );
}
```

## Controller Pattern Benefits

1. **Single Point of Control**: All data flows through the view controller
2. **Service Abstraction**: Components don't need to know about service layer
3. **Data Consistency**: Centralized data transformation and caching
4. **Easy Testing**: Controller can be mocked for component testing
5. **Clear Data Flow**: Service → Controller → Components
6. **Type Safety**: Automatic transformation ensures consistent data types

## Data Flow

```
Backend API (string values) → Service Layer → View Controller (transforms to numbers) → React Hooks → Components
```

## Adding New Domains

1. Create domain directory: `store/{domain}/`
2. Add service layer: `service/{domain}.service.ts`
3. Add view controller: `view/{domain}.view.ts`
4. Create index files for exports
5. Update main store index

## Migration Notes

- View layer now acts as a controller that forwards service data
- Components should only use hooks that call the view controller
- Direct service calls should never be made from components
- All data transformation happens in the view controller
- Value fields are automatically converted from string to number 
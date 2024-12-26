export interface RestaurantDtoModel {
    id: string,
    name: string,
    description: string,
    openingHours: string,
    imageUrl: string,
    rating: number,
    foodType: string,
    prices: number,
    commentsCount: number
}

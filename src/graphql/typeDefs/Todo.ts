import { ObjectType, Field, ID, InputType } from 'type-graphql';

@ObjectType({ description: 'A Todo object' })
export class Todo {
  @Field((type) => ID, { description: 'The id of the Todo' })
  id: string;

  @Field({ description: 'The name of the Todo' })
  name: string;

  @Field({ description: 'true, if the Todo has been completed', defaultValue: false })
  completed: boolean;

  @Field({ nullable: true, defaultValue: undefined, description: 'Date when the Todo is due.' })
  dueDate?: Date;
}

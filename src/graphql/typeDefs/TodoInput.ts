import { Field, ID, InputType } from 'type-graphql';

@InputType({ description: 'A Todo object that should be processed by the API' })
export class TodoInput {
  @Field((type) => ID, { description: 'The id of the Todo' })
  id: string;

  @Field({ description: 'The name of the Todo', nullable: true })
  name?: string;

  @Field({
    description: 'true, if the Todo has been completed',
    nullable: true,
    defaultValue: false,
  })
  completed?: boolean;

  @Field({ nullable: true, defaultValue: undefined, description: 'Date when the Todo is due.' })
  dueDate?: Date;
}

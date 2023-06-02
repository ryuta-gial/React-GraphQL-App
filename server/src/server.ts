// このコードは、GraphQLを使用してApollo Serverインスタンスをセットアップし、
// Prismaクライアントを使用してデータベースに接続しています。クエリとミューテーションのタイプが含まれており、
// データベースのデータを取得および作成するためのリゾルバがあります。
import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
require("dotenv").config();

// この部分のコードはPrismaクライアントのインスタンスを作成しています。

// Prismaは、Node.jsとTypeScriptのためのオープンソースのデータベースツールです。
// PrismaはSQLやMongoDBなどの複数のデータベースをサポートしており、
// ORM(Object-Relational Mapping)の概念を超えたものとして機能します。

// PrismaClientはPrismaの主要なクラスで、データベースとの通信を可能にします。これにより、
// データベースとのインタラクション（例えば、データの取得や更新）をJavaScriptまたはTypeScriptのコードで行うことができます。
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DB_URL,
    },
  },
});

// TypeDefs: GraphQLのスキーマを定義します。ここには、アプリケーションで利用可能なクエリやミューテーション、
// そしてそれらが返すデータ型を定義しています。
const typeDefs = gql`
  type Query {
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    createUser(
      name: String!
      birthDate: String!
      gender: String!
      phoneNumber: String!
    ): User
  }

  type User {
    id: ID!
    name: String!
    birthDate: String!
    gender: String!
    phoneNumber: String!
  }
`;
// リゾルバ: リゾルバは、クエリやミューテーションが実行されたときに呼び出される関数です。
// ここでは、特定のユーザを取得、全ユーザを取得、新規ユーザを作成するためのリゾルバが定義されています。
// これらのリゾルバは、Prismaクライアントを使用してデータベースと通信します。
interface UserArgs {
  id: string;
}

interface Context {
  prisma: PrismaClient;
}

interface UsersArgs {}

interface CreateUserArgs {
  name: string;
  gender: string;
  phoneNumber: string;
}

const resolvers = {
  Query: {
    //userに対するリゾルバ関数を定義しています。このリゾルバ関数は、GraphQLクエリからユーザーの情報を取得す
    // _parent: これは親のリゾルバからの戻り値です。ルートレベルのクエリでは通常使われません。

    // args: これはGraphQLクエリから渡される引数です。この例では、特定のユーザーを識別するためのidが渡されると想定されます。

    // _context: これはすべてのリゾルバを通じて共有されるコンテキストオブジェクトです。このコンテキストは通常、データベースへの接続などのリゾルバがアクセスする必要のあるデータやメソッドを保持します。

    // _info: これはクエリの実行状態に関する情報を含むオブジェクトです。これは通常、フィールドの解決の深さやどのフィールドがリクエストされているかなど、より複雑なケースで使用されます。

    // この関数は、引数argsからidを取り出し、そのidを使用してデータベースからユーザーの情報を取得します。取得したユーザーの情報はPromiseとして返され、GraphQLサーバーはこれを利用してクエリに対するレスポンスを生成します。

    // なお、引数名が_で始まるのは、その引数がこの関数の中で使われていないことを示す一般的な慣習です。

    user: async (
      _parent: unknown,
      args: UserArgs,
      _context: Context,
      _info: any
    ) => {
      return await prisma.user.findUnique({ where: { id: Number(args.id) } });
    },
    users: async (
      _parent: unknown,
      _args: UsersArgs,
      _context: Context,
      _info: any
    ) => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    createUser: async (
      _parent: unknown,
      { name, gender, phoneNumber }: CreateUserArgs,
      _context: Context,
      _info: any
    ) => {
      if (gender !== "男性") {
        throw new Error("Invalid gender value");
      }
      try {
        return await prisma.user.create({
          data: {
            name,
            birthDate: new Date(),
            gender,
            phoneNumber,
          },
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
};
// Apollo Serverの初期化と起動: ApolloServerクラスの新しいインスタンスを作成し、上記で定義したスキーマ（typeDefs）と
// リゾルバを引数として渡します。そして、server.listen()を呼び出してサーバーを起動します。サーバーのURLは、起動後にコンソールに表示されます。
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

export default server;

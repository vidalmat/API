<?php

namespace App\Doctrine;

use App\Entity\Post;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use App\Entity\User;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class CurrentUser implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    private $security;
    private $auth;

    public function __construct(Security $security, AuthorizationCheckerInterface $checkAuth)
    {
        $this->security = $security;
        $this->auth = $checkAuth;
    }

    private function filterUser(string $resourceClass,QueryBuilder $queryBuilder)
    {
                //Récupèrer l'utilisateur connecté 
                $user = $this->security->getUser();

                //Quand on filtre les posts et ensuite on rajoute une condition afin d'afficher les posts en fonction de l'utilisateur connecter
                if ($resourceClass === Post::class && !$this->auth->isGranted('ROLE_ADMIN') && $user instanceof User) {
                    $rootAlias = $queryBuilder->getRootAliases()[0];
        
                    $queryBuilder->andWhere("$rootAlias.author = :user");
                    
                    $queryBuilder->setParameter("user", $user);
                }
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, ?string $operationName = null)
    {
        $this->filterUser($resourceClass,$queryBuilder);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, ?string $operationName = null, array $context = [])
    {
        $this->filterUser($resourceClass,$queryBuilder);
    }
}
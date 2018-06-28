<?php
/**
 * Created by PhpStorm.
 * User: filiphristov
 * Date: 28/06/2018
 * Time: 16:16
 */

namespace App\EventSubscriber;


use App\Controller\TokenAuthenticatedController;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;

class TokenSubscriber implements EventSubscriberInterface
{
    public function __construct()
    {

    }

    // Event for before controller execution
    public function onKernelController(FilterControllerEvent $event)
    {
        $controller = $event->getController();

        /*
         * $controller passed can be either a class or a Closure.
         * This is not usual in Symfony but it may happen.
         * If it is a class, it comes in array format
         */
        if (!is_array($controller)) {
            return;
        }

        if ($controller[0] instanceof TokenAuthenticatedController) {
            // TODO: Validate if logged in
        }
    }

    // Event for after controller execution
    public function onKernelResponse(FilterResponseEvent $event)
    {
        // TODO: Logic for after controller execution
    }

    public static function getSubscribedEvents()
    {
        return array(
            KernelEvents::CONTROLLER => 'onKernelController',
            KernelEvents::RESPONSE => 'onKernelResponse'
        );
    }
}

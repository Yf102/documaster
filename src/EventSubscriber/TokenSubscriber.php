<?php
/**
 * Created by PhpStorm.
 * User: filiphristov
 * Date: 28/06/2018
 * Time: 16:16
 */

namespace App\EventSubscriber;

use App\Controller\TokenAuthenticatedController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class TokenSubscriber implements EventSubscriberInterface
{
	protected $app;
	private $router;

    public function __construct(RouterInterface $r)
    {
    	$this->app = new \DocumasterApp();
    	$this->router = $r;
    }

    public function onKernelRequest() {
		if (session_status() == PHP_SESSION_NONE) {
			session_start();
		}
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
        	if(is_null($this->app->curUser())) {
				throw new AccessDeniedHttpException('This action requires login!');
			}
        }
    }

    public function onKernelException(GetResponseForExceptionEvent $event) {
    	$exception = $event->getException();
    	if($exception instanceof AccessDeniedHttpException) {
			$url = $this->router->generate("login");
			$response = new RedirectResponse($url);
			$event->setResponse($response);
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
            KernelEvents::RESPONSE => 'onKernelResponse',
			KernelEvents::EXCEPTION => 'onKernelException',
			KernelEvents::REQUEST => 'onKernelRequest'
        );
    }
}

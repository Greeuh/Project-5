@extends('products.layout')
@section('content')
    <div class="d-flex justify-content-between my-3">
        
            <div>
                <h2> Show Product</h2>
            </div>
            <div>
                <a class="btn btn-primary" href="{{ route('products.index') }}"> Back</a>
            </div>
       
    </div>
   
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 my-3">
            <div class="form-group">
                <strong>Name:</strong>
                {{ $product->name }}
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 my-3">
            <div class="form-group">
                <strong>Details:</strong>
                {{ $product->detail }}
            </div>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 my-3">
            <div class="form-group">
                <strong>Created at:</strong>
                {{ $product->created_at }}
            </div>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 my-3">
            <div class="form-group">
                <strong>Updated at:</strong>
                {{ $product->updated_at }}
            </div>
        </div>
    </div>
@endsection
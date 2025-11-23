/**
 * ErrorBoundary
 * エラーキャッチ用の境界コンポーネント
 */

import React, { Component, ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 justify-center items-center bg-app-background p-lg">
          <Text className="text-xl font-bold text-black mb-4">
            エラーが発生しました
          </Text>
          <Text className="text-body-medium text-gray-600 mb-8 text-center">
            申し訳ございません。予期しないエラーが発生しました。
          </Text>
          {__DEV__ && this.state.error && (
            <View className="bg-red-100 p-4 rounded mb-4 w-full">
              <Text className="text-sm text-red-800">
                {this.state.error.toString()}
              </Text>
            </View>
          )}
          <TouchableOpacity
            onPress={this.handleReset}
            className="bg-blue-500 px-8 py-3 rounded"
          >
            <Text className="text-white font-medium">再試行</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}
